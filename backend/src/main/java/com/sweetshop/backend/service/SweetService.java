package com.sweetshop.backend.service;

import com.sweetshop.backend.dto.SweetDto;
import com.sweetshop.backend.model.Sweet;
import java.util.List;

public interface SweetService {
    Sweet createSweet(SweetDto sweetDto);
    List<Sweet> getAllSweets();
    Sweet updateSweet(Long id, SweetDto sweetDto);
    void deleteSweet(Long id);
    Sweet purchaseSweet(Long id, int quantity);
    Sweet restockSweet(Long id, int quantity);
    List<Sweet> searchSweets(String name, String category);
}