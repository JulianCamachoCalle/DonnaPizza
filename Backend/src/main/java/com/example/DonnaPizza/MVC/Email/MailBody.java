package com.example.DonnaPizza.MVC.Email;

import lombok.Builder;

@Builder
public record MailBody(String to, String subject, String text) {
}
