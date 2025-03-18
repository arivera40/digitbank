package com.org.digitbank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.digitbank.model.Account;

public interface AccountRepository extends JpaRepository<Account, Integer> {
	List<Account> findByUserId(Integer userId);
}
