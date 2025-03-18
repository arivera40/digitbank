package com.org.digitbank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.org.digitbank.model.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
	@Query(value = "SELECT t FROM Transaction t "
	        + "WHERE t.fromAccountId = :account_id "
	        + "OR t.toAccountId = :account_id")
	List<Transaction> findByAccountId(@Param("account_id") Integer accountId);
}
