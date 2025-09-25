package com.sweetshop.backend.service;

import com.sweetshop.backend.dto.SweetDto;
import com.sweetshop.backend.model.Sweet;
import com.sweetshop.backend.repository.SweetRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SweetServiceImpl implements SweetService {

    @Autowired
    private SweetRepository sweetRepository;

    @Override
    public Sweet createSweet(SweetDto sweetDto) {
        Sweet sweet = new Sweet();
        sweet.setName(sweetDto.getName());
        sweet.setCategory(sweetDto.getCategory());
        sweet.setPrice(sweetDto.getPrice());
        sweet.setQuantity(sweetDto.getQuantity());
        sweet.setDescription(sweetDto.getDescription());
        sweet.setImage(sweetDto.getImage());
        return sweetRepository.save(sweet);
    }

    @Override
    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }

    @Override
    public Sweet updateSweet(Long id, SweetDto sweetDto) {
        Sweet existingSweet = sweetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sweet not found with id: " + id));

        existingSweet.setName(sweetDto.getName());
        existingSweet.setCategory(sweetDto.getCategory());
        existingSweet.setPrice(sweetDto.getPrice());
        existingSweet.setQuantity(sweetDto.getQuantity());
        existingSweet.setDescription(sweetDto.getDescription());
        existingSweet.setImage(sweetDto.getImage());

        return sweetRepository.save(existingSweet);
    }

    @Override
    public void deleteSweet(Long id) {
        if (!sweetRepository.existsById(id)) {
            throw new EntityNotFoundException("Sweet not found with id: " + id);
        }
        sweetRepository.deleteById(id);
    }

    @Override
    public Sweet purchaseSweet(Long id, int quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sweet not found with id: " + id));

        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient quantity for " + sweet.getName());
        }

        sweet.setQuantity(sweet.getQuantity() - quantity);
        return sweetRepository.save(sweet);
    }

    @Override
    public Sweet restockSweet(Long id, int quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sweet not found with id: " + id));

        sweet.setQuantity(sweet.getQuantity() + quantity);
        return sweetRepository.save(sweet);
    }

    @Override
    public List<Sweet> searchSweets(String name, String category) {
        return sweetRepository.findAll().stream()
                .filter(sweet -> (name == null || sweet.getName().toLowerCase().contains(name.toLowerCase())))
                .filter(sweet -> (category == null || sweet.getCategory().equalsIgnoreCase(category)))
                .collect(Collectors.toList());
    }
}