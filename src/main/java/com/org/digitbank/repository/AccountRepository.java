package com.org.digitbank.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.digitbank.model.BankAccount;

public interface AccountRepository extends JpaRepository<BankAccount, Integer> {
	Optional<BankAccount> findByUserId(Integer userId);
}
