package com.backend.ToDoList.controller;

import com.backend.ToDoList.model.Object;
import com.backend.ToDoList.service.ObjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/object")
@CrossOrigin("http://localhost:5173")
public class ObjectController {
    @Autowired
    ObjectService objectService;

    @GetMapping
    public ResponseEntity<List<Object>> getAllObjects()
    {
        return new ResponseEntity<List<Object>>(objectService.getAllObject(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Optional<Object>> getSingleObject(@PathVariable Long id)
    {
        return new ResponseEntity<Optional<Object>>(objectService.getSingleObject(id),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> createObject(@RequestBody Object object)
    {
        return new ResponseEntity<Object>(objectService.createObject(object),HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Object> updateObject (@PathVariable Long id, @RequestBody Object object)
    {
        if(objectService.isExisted(id))
        {
            return new ResponseEntity<Object>(objectService.updateObject(object),HttpStatus.CREATED);
        }else
        {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Boolean> deleteObject(@PathVariable Long id)
    {
        return new ResponseEntity<Boolean>(objectService.deleteObject(id),HttpStatus.OK);
    }
}
