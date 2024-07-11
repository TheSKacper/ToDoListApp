package com.backend.ToDoList.service;

import com.backend.ToDoList.model.Object;
import com.backend.ToDoList.repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ObjectService {

    @Autowired
    ObjectRepository objectRepository;

    public Object createObject(Object object)
    {
        return objectRepository.save(object);
    }

    public Boolean deleteObject(Long id)
    {
        if(objectRepository.existsById(id))
        {
            objectRepository.deleteById(id);
            return true;
        }else {
            return false;
        }
    }

    public Object updateObject(Object object)
    {
        return objectRepository.save(object);
    }

    public Boolean isExisted(Long id)
    {
        if(objectRepository.existsById(id))
        {
            return true;
        }else
        {
            return false;
        }
    }

    public List<Object> getAllObject()
    {
        return objectRepository.findAll();
    }

    public Optional<Object> getSingleObject(Long id)
    {
        return objectRepository.findById(id);
    }

    public List<Object> getByCategory(String category)
    {
        return objectRepository.findByCategory(category);
    }
}
