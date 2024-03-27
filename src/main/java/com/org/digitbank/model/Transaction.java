package com.org.digitbank.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Transaction {
	@Id
	@GeneratedValue
	private Integer transactionId;

	private BigDecimal amount;

	private Integer fromAccountId;

	private Integer toAccountId;
	
	@Enumerated(EnumType.STRING)
	private TransactionType transactionType;
}
