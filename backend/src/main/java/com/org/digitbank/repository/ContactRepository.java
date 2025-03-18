package com.org.digitbank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.org.digitbank.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
	@Query(value = "SELECT c FROM Contact c "
			+ "WHERE c.userId = :user_id")
	List<Contact> findByUserId(@Param("user_id") Integer userId);
}
