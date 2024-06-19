package com.org.digitbank.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.org.digitbank.model.Account;
import com.org.digitbank.model.AccountType;
import com.org.digitbank.payload.JwtAuthenticationResponse;
import com.org.digitbank.repository.AccountRepository;
import com.org.digitbank.service.JwtService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AccountController {
	private final AccountRepository accountRepository;
	private final JwtService jwtService;
	
	@RequestMapping("/bank/getAccounts")
    public ResponseEntity<List<Account>> getAccounts(@RequestHeader("Authorization") String authHeader) {
		System.out.println("getAccounts");
        // Extract JWT token from Authorization header
        String jwtToken = authHeader.substring(7);
        
        // Extract user id from JWT token
        Integer userId = jwtService.extractClaim(jwtToken, claims -> claims.get("userId", Integer.class));
        
        System.out.println(userId);
        
        // Query database for accounts associated with the user
        List<Account> accounts = accountRepository.findByUserId(userId);
        
        
        return ResponseEntity.ok(accounts);
	}
	
	@PostMapping("bank/createSavings")
	public ResponseEntity<Account> createSavings(@RequestHeader("Authorization") String authHeader) {
		System.out.println("createSavings");
		// Extract JWT token from Authorization header
        String jwtToken = authHeader.substring(7);
        
        // Extract user id from JWT token
        Integer userId = jwtService.extractClaim(jwtToken, claims -> claims.get("userId", Integer.class));
        
		Account account = Account.builder().userId(userId).accountType(AccountType.SAVINGS).balance(new BigDecimal(0)).build();
		
		return ResponseEntity.ok(accountRepository.save(account));
	}
}
