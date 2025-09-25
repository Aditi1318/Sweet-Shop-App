package com.sweetshop.backend.repository;

import com.sweetshop.backend.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SweetRepository extends JpaRepository<Sweet, Long> {
    // You can add custom query methods here later for search functionality
}