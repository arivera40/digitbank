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
public class BankAccount {
	@Id
	@GeneratedValue
	private Integer accountId;
	
	private Integer userId;
	
	private BigDecimal balance;
	
	@Enumerated(EnumType.STRING)
	private AccountType accountType;
}
