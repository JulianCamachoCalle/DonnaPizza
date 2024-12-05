package com.example.DonnaPizza.MVC.Pasta;

import com.example.DonnaPizza.Exception.ResourceNotFoundException;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Service
public class PastaService {

    private final PastaRepository pastaRepository;

    // Obtener todos
    public Iterable<Pasta> findAll() {
        return pastaRepository.findAll();
    }

    // Obtener por ID
    public Pasta findById(Long id_pasta) {
        return pastaRepository.findById(id_pasta).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public Pasta create(PastaDTO pastaDTO) {
        ModelMapper mapper = new ModelMapper();
        Pasta pasta = mapper.map(pastaDTO, Pasta.class);
        return pastaRepository.save(pasta);
    }

    // Actualizar
    public Pasta update(Long id_pasta, PastaDTO pastaDTO) {
        Pasta pastaFromDB = findById(id_pasta);

        ModelMapper mapper = new ModelMapper();
        mapper.map(pastaDTO, pastaFromDB);

        return pastaRepository.save(pastaFromDB);
    }

    // Eliminar
    public void delete(Long id_pasta) {
        Pasta pastaFromDB = findById(id_pasta);
        pastaRepository.delete(pastaFromDB);
    }

    public void generarExcelPasta(HttpServletResponse response) throws IOException {
        List<Pasta> pastas = pastaRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Pastas Info");

        // Estilo del título
        HSSFCellStyle titleStyle = workbook.createCellStyle();
        HSSFFont titleFont = workbook.createFont();
        titleFont.setBold(true);
        titleFont.setFontHeightInPoints((short) 22);
        titleStyle.setFont(titleFont);
        titleStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GREEN.getIndex());
        titleStyle.setBorderBottom(BorderStyle.THIN);
        titleStyle.setBorderTop(BorderStyle.THIN);
        titleStyle.setBorderRight(BorderStyle.THIN);
        titleStyle.setBorderLeft(BorderStyle.THIN);
        titleStyle.setAlignment(HorizontalAlignment.CENTER);

        // Crear fila del título y fusionar celdas
        HSSFRow titleRow = sheet.createRow(0);
        HSSFCell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Info Pastas");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 5)); // Reemplazar el 5 segun la cantidad de headers - 1

        // Estilo del encabezado
        HSSFCellStyle headerStyle = workbook.createCellStyle();
        HSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 12);
        headerStyle.setFont(font);
        headerStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.LIGHT_GREEN.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerStyle.setBorderBottom(BorderStyle.THIN);
        headerStyle.setBorderTop(BorderStyle.THIN);
        headerStyle.setBorderRight(BorderStyle.THIN);
        headerStyle.setBorderLeft(BorderStyle.THIN);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);

        // Crear fila de encabezado
        HSSFRow row = sheet.createRow(1);
        String[] headers = {"ID_pasta", "Nombre", "Descripcion", "Precio", "Disponible"};
        for (int i = 0; i < headers.length; i++) {
            HSSFCell cell = row.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }

        // Estilo de los datos
        HSSFCellStyle dataStyle = workbook.createCellStyle();
        dataStyle.setBorderBottom(BorderStyle.THIN);
        dataStyle.setBorderTop(BorderStyle.THIN);
        dataStyle.setBorderRight(BorderStyle.THIN);
        dataStyle.setBorderLeft(BorderStyle.THIN);
        dataStyle.setAlignment(HorizontalAlignment.CENTER);

        // Llenar datos
        int dataRowIndex = 2;
        for (Pasta pasta : pastas) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex++);
            dataRow.createCell(0).setCellValue(pasta.getId_pasta());
            dataRow.createCell(1).setCellValue(pasta.getNombre());
            dataRow.createCell(1).setCellValue(pasta.getDescripcion());
            dataRow.createCell(2).setCellValue(pasta.getPrecio());
            dataRow.createCell(3).setCellValue(pasta.getDisponible() ? "Disponible" : "No Disponible");

            // Aplicar estilo de datos a cada celda
            for (int i = 0; i < headers.length; i++) {
                dataRow.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Ajustar ancho de las columnas después de llenar los datos
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Enviar el archivo a pastas
        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
    }
}