package com.org.digitbank.payload;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionRequest {
	@DecimalMin(value = "0.01", message = "Amount must be greater than $0.00")
	private BigDecimal amount;
	
	private Integer fromAccountId;
	
	private Integer toAccountId;
}
