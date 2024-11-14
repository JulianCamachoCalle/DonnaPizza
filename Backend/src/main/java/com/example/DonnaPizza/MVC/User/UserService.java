package com.example.DonnaPizza.MVC.User;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Actualizar
    @Transactional
    public UserResponse updateUser(UserRequest userRequest) {

        User user = User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .nombre(userRequest.getNombre())
                .apellido(userRequest.getApellido())
                .telefono(userRequest.getTelefono())
                .direccion(userRequest.getDireccion())
                .rol(Role.USER)
                .build();

        userRepository.updateUser(user.id_usuario, user.username, user.password, user.nombre, user.apellido, user.telefono, user.direccion);

        return new UserResponse("El usuario se registro exitosamente!");
    }

    // Obtener Segun el ID
    public UserDTO getUser(long id) {
        User user = userRepository.findById(id).orElse(null);

        if (user != null) {
            UserDTO userDTO = UserDTO.builder()
                    .username(user.username)
                    .nombre(user.nombre)
                    .apellido(user.apellido)
                    .telefono(user.telefono)
                    .direccion(user.direccion)
                    .build();
            return userDTO;
        }
        return null;
    }

    // Registrar Nuevo
    public UserResponse registerUser(UserRequest userRequest) {
        User user = User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .nombre(userRequest.getNombre())
                .apellido(userRequest.getApellido())
                .telefono(userRequest.getTelefono())
                .direccion(userRequest.getDireccion())
                .fecha_registro(userRequest.getFecha_registro())
                .rol(Role.USER)
                .build();

        userRepository.save(user);
        return new UserResponse("El usuario se registro exitosamente!");
    }

    public boolean checkUsernameExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean checkTelefonoExists(String telefono) {
        return userRepository.existsByTelefono(telefono);
    }
    
}
