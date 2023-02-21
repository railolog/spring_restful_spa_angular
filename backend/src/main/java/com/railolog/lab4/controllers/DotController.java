package com.railolog.lab4.controllers;

import com.railolog.lab4.models.Dot;
import com.railolog.lab4.models.User;
import com.railolog.lab4.payload.request.AddDotRequest;
import com.railolog.lab4.repository.UserRepository;
import com.railolog.lab4.security.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/", maxAge = 3600)
@RestController
@RequestMapping("/dot")
public class DotController {
    @Autowired
    UserRepository userRepository;

    @PostMapping(value = "/add-dot", produces = "application/json")
    public Dot addDot(@Valid @RequestBody AddDotRequest dot) {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getUsername()));

        user.addDot(new Dot(dot.getX(), dot.getY(), dot.getR()));
        userRepository.save(user);

        return user.getLastDot();
    }

    @PostMapping("remove-dots")
    public ResponseEntity<?> removeDots() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getUsername()));

        user.removeDots();
        userRepository.save(user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("get-all-dots")
    public List<Dot> getAllDots() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Long userId = userDetails.getId();

        User user = userRepository.findUserById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userDetails.getUsername()));

        return user.getDots();
    }
}
