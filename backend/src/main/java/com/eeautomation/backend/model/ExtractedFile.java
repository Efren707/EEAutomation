package com.eeautomation.backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "extracted_files")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExtractedFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private String originalFilename;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String extractedText;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String file_path;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

}