package com.hiTech.Netlab.Helper;

import com.hiTech.Netlab.Entity.Desktop;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class DesktopDownloadData {

    public static final String TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    private static final String[] HEADERS = {
            "Id",
            "Service Tag",
            "Description",
            "Hardware Configuration",
            "Location",
            "IP Address",
            "OS",
            "Team",
            "Status",
            "Purchase By"
    };

    private static final String SHEET = "Desktop";

    public static ByteArrayInputStream desktopsToExcel(List<Desktop> desktops) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet(SHEET);

            // Create header row
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERS.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERS[col]);
            }

            // Populate desktop records
            int rowIdx = 1;

            for (Desktop desktop : desktops) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(
                        desktop.getId() == null ? 0 : desktop.getId());

                row.createCell(1).setCellValue(
                        safe(desktop.getServiceTag()));

                row.createCell(2).setCellValue(
                        safe(desktop.getDescription()));

                row.createCell(3).setCellValue(
                        safe(desktop.getHardwareConf()));

                row.createCell(4).setCellValue(
                        safe(desktop.getLocation()));

                row.createCell(5).setCellValue(
                        safe(desktop.getIpAddress()));

                row.createCell(6).setCellValue(
                        safe(desktop.getOs()));

                row.createCell(7).setCellValue(
                        safe(desktop.getTeam()));

                row.createCell(8).setCellValue(
                        safe(desktop.getStatus()));

                row.createCell(9).setCellValue(
                        safe(desktop.getPurchaseBy()));
            }

            // Adjust column widths
            for (int col = 0; col < HEADERS.length; col++) {
                sheet.autoSizeColumn(col);
            }

            workbook.write(out);

            return new ByteArrayInputStream(out.toByteArray());

        } catch (IOException e) {
            throw new RuntimeException(
                    "Failed to export Desktop data to Excel: "
                            + e.getMessage(), e);
        }
    }

    private static String safe(String value) {
        return value == null ? "" : value;
    }
}
