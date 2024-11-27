package com.example.DonnaPizza.Auth.Password;

import com.example.DonnaPizza.MVC.Email.EmailService;
import com.example.DonnaPizza.MVC.Email.MailBody;
import com.example.DonnaPizza.MVC.User.User;
import com.example.DonnaPizza.MVC.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.Random;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ForgotPasswordRepository forgotPasswordRepository;
    private final PasswordEncoder passwordEncoder;

    public ForgotPasswordController(UserRepository userRepository, EmailService emailService, ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.forgotPasswordRepository = forgotPasswordRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Enviar email para verificar
    @PostMapping("/verificarEmail/{email}")
    public ResponseEntity<Map<String, String>> verificarEmail(@PathVariable String email) {
        User user = userRepository.findByUsername(email)
                .orElseThrow(() -> new UsernameNotFoundException("Ingrese un email valido"));

        int otp = otpGenerator();
        MailBody mailBody = MailBody.builder()
                .to(email)
                .text("Este es el token para recuperar tu contrasena: " + otp)
                .subject("token para recuperar contrasena")
                .build();

        ForgotPassword fp = ForgotPassword.builder()
                .otp(otp)
                .tiempo_expiracion(new Date(System.currentTimeMillis() + 5 * 60 * 1000))
                .user(user)
                .build();

        emailService.sendSimpleMessage(mailBody);
        forgotPasswordRepository.save(fp);

        return ResponseEntity.ok(Map.of("message", "Email enviado para verificar!"));
    }

    @PostMapping("/verificarOTP/{otp}/{email}")
    public ResponseEntity<Map<String, String>> verificarOTP(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepository.findByUsername(email)
                .orElseThrow(() -> new UsernameNotFoundException("Ingrese un email valido"));

        ForgotPassword fp = forgotPasswordRepository.findByOtpAndUser(otp, user)
                .orElseThrow(() -> new RuntimeException("OTP invalido para el email: " + email));

        if (fp.getTiempo_expiracion().before(Date.from(Instant.now()))) {
            forgotPasswordRepository.deleteById(fp.getFp_id());
            return new ResponseEntity<>(Map.of("error", "OTP ha expirado!"), HttpStatus.EXPECTATION_FAILED);
        }

        return ResponseEntity.ok(Map.of("message", "OTP verificado"));
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<Map<String, String>> changePasswordHandler(@RequestBody ChangePassword changePassword, @PathVariable String email) {

        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>(Map.of("error", "Por favor ingresa tu contraseña otra vez"), HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepository.updatePassword(email, encodedPassword);

        return ResponseEntity.ok(Map.of("message", "La contraseña ha sido cambiada"));
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}
