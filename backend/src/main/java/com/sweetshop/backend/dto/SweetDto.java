package com.sweetshop.backend.dto;

import lombok.Data;

@Data
public class SweetDto {
    private String name;
    private String category;
    private Double price;
    private Integer quantity;
    private String description;
    private String image;
}