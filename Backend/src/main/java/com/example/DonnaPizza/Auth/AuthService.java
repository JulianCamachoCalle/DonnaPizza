package com.example.DonnaPizza.Auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.DonnaPizza.Jwt.JwtService;
import com.example.DonnaPizza.MVC.User.Role;
import com.example.DonnaPizza.MVC.User.User;
import com.example.DonnaPizza.MVC.User.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        System.out.println("Request recibido: " + request);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsernamelogin(), request.getPasswordlogin()));
        User user = userRepository.findByUsername(request.getUsernamelogin()).orElseThrow();
        String token = jwtService.getToken(user);
        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse register(RegisterRequest request) {
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .telefono(request.getTelefono())
                .direccion(request.getDireccion())
                .fecha_registro(request.getFecha_registro())
                .rol(Role.USER)
                .build();

        userRepository.save(user);

        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();
    }
}
