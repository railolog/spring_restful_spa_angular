package com.railolog.lab4.repository;

import com.railolog.lab4.models.Dot;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DotRepository extends CrudRepository<Dot, Long> {

}
