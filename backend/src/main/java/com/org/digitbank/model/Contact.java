package com.org.digitbank.model;

import jakarta.persistence.Entity;
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
public class Contact {
	@Id
	@GeneratedValue
	private Integer contactId;

	private Integer userId;

	private Integer recipientId;
	
	private String contactName;
	
	private String phoneNumber;
	
	private String email;
}
