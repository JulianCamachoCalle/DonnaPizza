package com.example.DonnaPizza.MVC.PizzasFamiliares;

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
public class PizzasFamiliaresService {

    private final PizzasFamiliaresRepository pizzasFamiliaresRepository;

    // Obtener todos
    public Iterable<PizzasFamiliares> findAll() {
        return pizzasFamiliaresRepository.findAll();
    }

    // Obtener por ID
    public PizzasFamiliares findById(Long id_pizzasFamiliares) {
        return pizzasFamiliaresRepository.findById(id_pizzasFamiliares).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public PizzasFamiliares create(PizzasFamiliaresDTO pizzasFamiliaresDTO) {
        ModelMapper mapper = new ModelMapper();
        PizzasFamiliares pizzasFamiliares = mapper.map(pizzasFamiliaresDTO, PizzasFamiliares.class);
        return pizzasFamiliaresRepository.save(pizzasFamiliares);
    }

    // Actualizar
    public PizzasFamiliares update(Long id_pizzasFamiliares, PizzasFamiliaresDTO pizzasFamiliaresDTO) {
        PizzasFamiliares pizzasFamiliaresFromDB = findById(id_pizzasFamiliares);

        ModelMapper mapper = new ModelMapper();
        mapper.map(pizzasFamiliaresDTO, pizzasFamiliaresFromDB);

        return pizzasFamiliaresRepository.save(pizzasFamiliaresFromDB);
    }

    // Eliminar
    public void delete(Long id_pizzasFamiliares) {
        PizzasFamiliares pizzasFamiliaresFromDB = findById(id_pizzasFamiliares);
        pizzasFamiliaresRepository.delete(pizzasFamiliaresFromDB);
    }

    // Generar Excel
    public void generarExcelPizzasFamiliares(HttpServletResponse response) throws IOException {
        List<PizzasFamiliares> pizzasFamiliares = pizzasFamiliaresRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Pizzas Familiares Info");

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
        titleCell.setCellValue("Info Pizzas Familiares");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4)); // Reemplazar el 4 segun la cantidad de headers - 1

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
        String[] headers = {"ID_Pizza", "Nombre", "Descripcion", "Precio", "Disponible"};
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
        for (PizzasFamiliares pizzafamiliar : pizzasFamiliares) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex++);
            dataRow.createCell(0).setCellValue(pizzafamiliar.getId_pizza_familiar());
            dataRow.createCell(1).setCellValue(pizzafamiliar.getNombre());
            dataRow.createCell(2).setCellValue(pizzafamiliar.getDescripcion());
            dataRow.createCell(3).setCellValue(pizzafamiliar.getPrecio());
            dataRow.createCell(4).setCellValue(pizzafamiliar.getDisponible());

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
