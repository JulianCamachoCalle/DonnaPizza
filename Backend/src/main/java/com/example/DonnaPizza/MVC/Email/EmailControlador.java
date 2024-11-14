package com.example.DonnaPizza.MVC.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/enviarEmail")
@CrossOrigin(origins = {"http://localhost:4200"})
public class EmailControlador {

    @Autowired
    private EmailSenderUtil emailSenderUtil;

    @PostMapping
    public String sendEmailMessage(@RequestBody EmailDto emailDto, 
                                   @RequestParam(value = "archivo", required = false) MultipartFile file) {
        return emailSenderUtil.sendEmail(emailDto, file);
    }
}