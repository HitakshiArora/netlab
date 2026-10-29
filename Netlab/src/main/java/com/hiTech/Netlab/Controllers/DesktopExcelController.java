
package com.hiTech.Netlab.Controllers;

import com.hiTech.Netlab.Helper.DesktopUploadData;
import com.hiTech.Netlab.Services.DesktopExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class DesktopExcelController {

    @Autowired
    private DesktopExcelService desktopExcelService;

    // Download Desktop Excel
    @CrossOrigin
    @GetMapping("/desktops/download")
    public ResponseEntity<Resource> getFile() {

        String filename = "desktops.xlsx";

        InputStreamResource file =
                new InputStreamResource(desktopExcelService.load());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + filename + "\""
                )
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    // Upload Desktop Excel
    @CrossOrigin
    @PostMapping("/desktops/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("file") MultipartFile file) {

        if (file.isEmpty() || !DesktopUploadData.hasExcelFormat(file)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please upload a valid Excel file!");
        }

        try {
            desktopExcelService.save(file);

            return ResponseEntity.ok(
                    "Uploaded Desktop Excel successfully: "
                            + file.getOriginalFilename()
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
                    .body("Could not upload Desktop Excel: "
                            + e.getMessage());
        }
    }
}
