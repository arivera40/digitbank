package com.org.digitbank.model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
@NoArgsConstructor
@Entity
public class BankAccount {
    @Id
    @GeneratedValue
    private Integer accountId;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private Integer userId;

    private BigDecimal balance;
}
