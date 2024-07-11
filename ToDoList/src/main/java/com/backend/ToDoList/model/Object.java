package com.backend.ToDoList.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Object {

    @Id
    @GeneratedValue
    private Long Id;
    private String title;
    private String description;
    private String category;
    @JsonProperty("finish")
    private boolean isFinish;
    private String process;
    private LocalDate date;
    private String priority;
}
