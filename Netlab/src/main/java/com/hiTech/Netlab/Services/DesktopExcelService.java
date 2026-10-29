
package com.hiTech.Netlab.Services;

import com.hiTech.Netlab.Entity.Desktop;
import com.hiTech.Netlab.Helper.DesktopDownloadData;
import com.hiTech.Netlab.Helper.DesktopUploadData;
import com.hiTech.Netlab.Repository.DesktopRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

@Service
public class DesktopExcelService {

    @Autowired
    private DesktopRepo desktopRepo;

    public ByteArrayInputStream load() {
        List<Desktop> desktops = desktopRepo.findAll();

        return DesktopDownloadData.desktopsToExcel(desktops);
    }

    public void save(MultipartFile file) {
        try {
            List<Desktop> desktops =
                    DesktopUploadData.excelToDesktops(file.getInputStream());

            if (desktops.isEmpty()) {
                throw new RuntimeException(
                        "Excel file contains no Desktop records.");
            }

            desktopRepo.saveAll(desktops);

        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to store Desktop Excel data: "
                            + e.getMessage(), e);
        }
    }
}
