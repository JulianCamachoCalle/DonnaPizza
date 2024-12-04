package com.example.DonnaPizza.Paypal;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/paypal")
public class PayPalController {

    @Autowired
    private APIContext apiContext;

    @PostMapping("/pay")
    public Map<String, String> makePayment(@RequestBody Map<String, String> paymentInfo) {
        Map<String, String> response = new HashMap<>();

        Amount amount = new Amount();
        amount.setCurrency("USD");
        amount.setTotal(paymentInfo.get("total")); // Total enviado desde el frontend

        Transaction transaction = new Transaction();
        transaction.setDescription("Compra en Donna Pizza");
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod("paypal");

        Payment payment = new Payment();
        payment.setIntent("sale");
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl("http://localhost:4200/payment/cancel");
        redirectUrls.setReturnUrl("http://localhost:4200/payment/success");
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment createdPayment = payment.create(apiContext);
            response.put("status", "success");
            response.put("redirect_url", createdPayment.getLinks().get(1).getHref());
        } catch (PayPalRESTException e) {
            e.printStackTrace();
            response.put("status", "error");
            response.put("message", e.getMessage());
        }

        return response;
    }
}
