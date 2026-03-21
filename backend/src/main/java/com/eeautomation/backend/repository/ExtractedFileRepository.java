package com.eeautomation.backend.repository;

import com.eeautomation.backend.model.ExtractedFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExtractedFileRepository extends JpaRepository<ExtractedFile, Long> {
}
