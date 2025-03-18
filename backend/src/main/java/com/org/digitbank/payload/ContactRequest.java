package com.org.digitbank.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ContactRequest {
	@NotBlank
	@Size(min = 1, max = 80)
	private String contactName;
	
	@Size(min = 1, max = 40)
	@Email
	private String email;
	
	@Size(min = 10, max = 10)
	private String phoneNumber;
}
