package com.example.DonnaPizza.Auth.Password;

import com.example.DonnaPizza.MVC.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ForgotPassword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer fp_id;

    @Column(nullable = false)
    private Integer otp;

    @Column(nullable = false)
    private Date tiempo_expiracion;

    @OneToOne
    private User user;
}
