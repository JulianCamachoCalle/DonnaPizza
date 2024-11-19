package com.example.DonnaPizza.MVC.Ingredientes;

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
public class IngredientesService {

    private final IngredientesRepository ingredientesRepository;

    // Obtener todos
    public Iterable<Ingredientes> findAll() {
        return ingredientesRepository.findAll();
    }

    // Obtener por ID
    public Ingredientes findById(Long id_ingredientes) {
        return ingredientesRepository.findById(id_ingredientes).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public Ingredientes create(IngredientesDTO ingredientesDTO) {
        ModelMapper mapper = new ModelMapper();
        Ingredientes ingredientes = mapper.map(ingredientesDTO, Ingredientes.class);
        return ingredientesRepository.save(ingredientes);
    }

    // Actualizar
    public Ingredientes update(Long id_ingredientes, IngredientesDTO ingredientesDTO) {
        Ingredientes ingredientesFromDB = findById(id_ingredientes);

        ModelMapper mapper = new ModelMapper();
        mapper.map(ingredientesDTO, ingredientesFromDB);

        return ingredientesRepository.save(ingredientesFromDB);
    }

    // Eliminar
    public void delete(Long id_ingredientes) {
        Ingredientes ingredientesFromDB = findById(id_ingredientes);
        ingredientesRepository.delete(ingredientesFromDB);
    }

    // Generar Excel
    public void generarExcelIngredientes(HttpServletResponse response) throws IOException {
        List<Ingredientes> ingredientes = ingredientesRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Ingredientes Info");

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
        titleCell.setCellValue("Info Ingredientes");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 2)); // Reemplazar el 2 segun la cantidad de headers - 1

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
        String[] headers = {"ID_Ingrediente", "Nombre", "Cantidad Disponible"};
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
        for (Ingredientes ingrediente : ingredientes) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex++);
            dataRow.createCell(0).setCellValue(ingrediente.getId_ingrediente());
            dataRow.createCell(1).setCellValue(ingrediente.getNombre());
            dataRow.createCell(2).setCellValue(ingrediente.getCantidad_disponible());

            // Aplicar estilo de datos a cada celda
            for (int i = 0; i < headers.length; i++) {
                dataRow.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Ajustar ancho de las columnas después de llenar los datos
        for (int i = 0; i < headers.length; i++) {
            sheet.autoSizeColumn(i);
        }

        // Enviar el archivo al cliente
        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
    }
}


