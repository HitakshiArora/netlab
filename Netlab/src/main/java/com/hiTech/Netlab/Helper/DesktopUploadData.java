package com.hiTech.Netlab.Helper;

import com.hiTech.Netlab.Entity.Desktop;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class DesktopUploadData {

    public static boolean hasExcelFormat(MultipartFile file) {
        String contentType = file.getContentType();

        return contentType != null &&
                (contentType.equals(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
                        || contentType.equals("application/vnd.ms-excel"));
    }

    public static List<Desktop> excelToDesktops(InputStream inputStream) {
        List<Desktop> desktops = new ArrayList<>();
        DataFormatter formatter = new DataFormatter();

        try (Workbook workbook = WorkbookFactory.create(inputStream)) {
            Sheet sheet = workbook.getSheetAt(0);

            // Row 0 contains headers; data starts from row 1
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);

                if (row == null) {
                    continue;
                }

                String serviceTag = formatter.formatCellValue(row.getCell(1)).trim();

                // Skip completely empty rows
                if (serviceTag.isEmpty()) {
                    continue;
                }

                Desktop desktop = new Desktop();

                // ID column is intentionally ignored.
                // Database should generate IDs for new records.
                desktop.setServiceTag(serviceTag);
                desktop.setDescription(formatter.formatCellValue(row.getCell(2)).trim());
                desktop.setHardwareConf(formatter.formatCellValue(row.getCell(3)).trim());
                desktop.setLocation(formatter.formatCellValue(row.getCell(4)).trim());
                desktop.setIpAddress(formatter.formatCellValue(row.getCell(5)).trim());
                desktop.setOs(formatter.formatCellValue(row.getCell(6)).trim());
                desktop.setTeam(formatter.formatCellValue(row.getCell(7)).trim());
                desktop.setStatus(formatter.formatCellValue(row.getCell(8)).trim());
                desktop.setPurchaseBy(formatter.formatCellValue(row.getCell(9)).trim());

                desktops.add(desktop);
            }

        } catch (IOException e) {
            throw new RuntimeException("Failed to read Desktop Excel file: "
                    + e.getMessage(), e);
        }

        return desktops;
    }
}
