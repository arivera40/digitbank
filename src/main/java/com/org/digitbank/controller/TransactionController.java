package com.org.digitbank.controller;

import java.math.BigDecimal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.org.digitbank.model.Account;
import com.org.digitbank.model.Transaction;
import com.org.digitbank.model.TransactionType;
import com.org.digitbank.payload.ApiResponse;
import com.org.digitbank.payload.RegisterRequest;
import com.org.digitbank.payload.TransactionRequest;
import com.org.digitbank.repository.TransactionRepository;
import com.org.digitbank.service.JwtService;
import com.org.digitbank.service.TransactionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class TransactionController {
	private final TransactionRepository transactionRepository;
	private final TransactionService transactionService;
	
	@PostMapping("/bank/deposit")
	public ResponseEntity<?> deposit(@Valid @RequestBody TransactionRequest transactionRequest) {
		System.out.println("deposit");
        Transaction transaction = Transaction.builder().amount(transactionRequest.getAmount()).fromAccountId(null).toAccountId(transactionRequest.getToAccountId()).transactionType(TransactionType.DEPOSIT).build();
        
        if (!transactionService.performDeposit(transaction)) {
    		return new ResponseEntity(new ApiResponse(false, "Deposit Unsuccessful!"), HttpStatus.BAD_REQUEST);
        }
        
    	return ResponseEntity.ok(transactionRepository.save(transaction));
	}
	
	@PostMapping("/bank/withdraw")
	public ResponseEntity<?> withdraw(@Valid @RequestBody TransactionRequest transactionRequest) {
		System.out.println("withdraw");
        Transaction transaction = Transaction.builder().amount(transactionRequest.getAmount()).fromAccountId(transactionRequest.getFromAccountId()).toAccountId(null).transactionType(TransactionType.WITHDRAW).build();
        
        if (!transactionService.performWithdraw(transaction)) {
    		return new ResponseEntity(new ApiResponse(false, "Withdraw Unsuccessful!"), HttpStatus.BAD_REQUEST);
        }
        
    	return ResponseEntity.ok(transactionRepository.save(transaction));
	}
}
