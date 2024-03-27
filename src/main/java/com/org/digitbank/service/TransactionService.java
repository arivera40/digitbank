package com.org.digitbank.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Service;

import com.org.digitbank.model.Account;
import com.org.digitbank.model.Transaction;
import com.org.digitbank.repository.AccountRepository;
import com.org.digitbank.repository.TransactionRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TransactionService {
	private final AccountRepository accountRepository;
	
	public boolean performDeposit(Transaction transaction) {
		System.out.println(transaction.getAmount());
		System.out.println(transaction.getToAccountId());
		Optional<Account> optionalAccount = accountRepository.findById(transaction.getToAccountId());
		
		if (optionalAccount.isPresent()) {
			Account account = optionalAccount.get();
			
			BigDecimal currentBalance = account.getBalance();
			
			account.setBalance(currentBalance.add(transaction.getAmount()));
			
			accountRepository.save(account);
			
			return true;
		} else {
			return false;
		}
	}
	
}
