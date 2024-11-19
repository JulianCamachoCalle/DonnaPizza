package com.example.DonnaPizza.MVC.MetodosPago;

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
public class MetodosPagoService {

    private final MetodosPagoRepository metodosPagoRepository;

    // Obtener todos
    public Iterable<MetodosPago> findAll() {
        return metodosPagoRepository.findAll();
    }

    // Obtener por ID
    public MetodosPago findById(Long id_metodospago) {
        return metodosPagoRepository.findById(id_metodospago).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public MetodosPago create(MetodosPagoDTO metodosPagoDTO) {
        ModelMapper mapper = new ModelMapper();
        MetodosPago metodosPago = mapper.map(metodosPagoDTO, MetodosPago.class);
        return metodosPagoRepository.save(metodosPago);
    }

    // Actualizar
    public MetodosPago update(Long id_metodospago, MetodosPagoDTO metodosPagoDTO) {
        MetodosPago metodosPagoFromDB = findById(id_metodospago);

        ModelMapper mapper = new ModelMapper();
        mapper.map(metodosPagoDTO, metodosPagoFromDB);

        return metodosPagoRepository.save(metodosPagoFromDB);
    }

    // Eliminar
    public void delete(Long id_metodospago) {
        MetodosPago metodosPagoFromDB = findById(id_metodospago);
        metodosPagoRepository.delete(metodosPagoFromDB);
    }

    // Generar Excel
    public void generarExcelMetodosPago(HttpServletResponse response) throws IOException {
        List<MetodosPago> metodosPago = metodosPagoRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("MetodosPago Info");

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
        titleCell.setCellValue("Info MetodosPago");
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
        String[] headers = {"ID_Metodos de Pago", "Nombre", "Descripcion"};
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
        for (MetodosPago metodoPago : metodosPago) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex++);
            dataRow.createCell(0).setCellValue(metodoPago.getId_metodo_pago());
            dataRow.createCell(1).setCellValue(metodoPago.getNombre());
            dataRow.createCell(2).setCellValue(metodoPago.getDescripcion());

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


