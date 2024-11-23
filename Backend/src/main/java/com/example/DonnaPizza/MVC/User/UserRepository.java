package com.example.DonnaPizza.MVC.User;

import java.util.Optional;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByTelefono(String telefono);

    boolean existsByUsername(String username);

    boolean existsByTelefono(String telefono);

    @Transactional
    @Modifying
    @Query("update User u set u.password = ?2 where u.username = ?1")
    void updatePassword(String username, String password);

    @Modifying()
    @Query("update User u set u.username=:username, u.password=:password, u.nombre=:nombre, u.apellido=:apellido, u.telefono=:telefono, u.direccion=:direccion where u.id_usuario=:id_usuario")
    void updateUser(@Param(value = "id_usuario") Long id_usuario,
                    @Param(value = "username") String username,
                    @Param(value = "password") String password,
                    @Param(value = "nombre") String nombre,
                    @Param(value = "apellido") String apellido,
                    @Param(value = "telefono") String telefono,
                    @Param(value = "direccion") String direccion);
}
