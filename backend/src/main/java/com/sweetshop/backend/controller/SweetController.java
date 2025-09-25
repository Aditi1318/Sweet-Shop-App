package com.sweetshop.backend.controller;

import com.sweetshop.backend.dto.InventoryRequestDto;
import com.sweetshop.backend.dto.SweetDto;
import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.service.SweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "http://localhost:5173")
public class SweetController {

    @Autowired
    private SweetService sweetService;

    // GET /api/sweets - View a list of all available sweets
    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        List<Sweet> sweets = sweetService.getAllSweets();
        return ResponseEntity.ok(sweets);
    }

    // GET /api/sweets/search - Search for sweets
    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category) {
        List<Sweet> sweets = sweetService.searchSweets(name, category);
        return ResponseEntity.ok(sweets);
    }

    // POST /api/sweets - Add a new sweet (Admin only)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> addSweet(@RequestBody SweetDto sweetDto) {
        Sweet newSweet = sweetService.createSweet(sweetDto);
        return new ResponseEntity<>(newSweet, HttpStatus.CREATED);
    }

    // PUT /api/sweets/:id - Update a sweet's details (Admin only)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> updateSweet(@PathVariable Long id, @RequestBody SweetDto sweetDto) {
        Sweet updatedSweet = sweetService.updateSweet(id, sweetDto);
        return ResponseEntity.ok(updatedSweet);
    }

    // DELETE /api/sweets/:id - Delete a sweet (Admin only)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteSweet(@PathVariable Long id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok("Sweet deleted successfully.");
    }

    // POST /api/sweets/:id/purchase - Purchase a sweet
    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable Long id, @RequestBody InventoryRequestDto request) {
        Sweet updatedSweet = sweetService.purchaseSweet(id, request.getQuantity());
        return ResponseEntity.ok(updatedSweet);
    }

    // POST /api/sweets/:id/restock - Restock a sweet (Admin only)
    @PostMapping("/{id}/restock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Sweet> restockSweet(@PathVariable Long id, @RequestBody InventoryRequestDto request) {
        Sweet updatedSweet = sweetService.restockSweet(id, request.getQuantity());
        return ResponseEntity.ok(updatedSweet);
    }
}