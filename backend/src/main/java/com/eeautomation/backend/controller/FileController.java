package com.eeautomation.backend.controller;

import com.eeautomation.backend.model.ExtractedFile;
import com.eeautomation.backend.model.User;
import com.eeautomation.backend.repository.ExtractedFileRepository;
import com.eeautomation.backend.repository.UserRepository;
import com.eeautomation.backend.service.N8nService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final N8nService n8nService;
    private final ExtractedFileRepository repository;
    private final UserRepository userRepository;

    public FileController(N8nService n8nService,
                          ExtractedFileRepository repository,
                          UserRepository userRepository) {
        this.n8nService = n8nService;
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            Principal principal
    ) {
        try {
            if (principal == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("User not authenticated");
            }

            String email = principal.getName();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String extractedText = "Implement n8nService";

            ExtractedFile saved = new ExtractedFile();
            saved.setUserId(user.getId());
            saved.setOriginalFilename(file.getOriginalFilename());
            saved.setExtractedText(extractedText);
            saved.setFile_path("temp/path/file.txt");

            repository.save(saved);

            return ResponseEntity.ok(Map.of(
                    "message", "File processed successfully",
                    "text", extractedText
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file");
        }
    }
}