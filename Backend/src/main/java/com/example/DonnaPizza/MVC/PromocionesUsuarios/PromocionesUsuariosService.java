package com.example.DonnaPizza.MVC.PromocionesUsuarios;

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
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@AllArgsConstructor
public class PromocionesUsuariosService {

    private final PromocionesUsuariosRepository promocionesUsuariosRepository;

    // Obtener todos
    public Iterable<PromocionesUsuarios> findAll() {
        return promocionesUsuariosRepository.findAll();
    }

    // Obtener por ID
    public PromocionesUsuarios findById(Long id_promocionesUsuarios) {
        return promocionesUsuariosRepository.findById(id_promocionesUsuarios).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public PromocionesUsuarios create(PromocionesUsuariosDTO promocionesUsuariosDTO) {
        ModelMapper mapper = new ModelMapper();
        PromocionesUsuarios promocionesUsuarios = mapper.map(promocionesUsuariosDTO, PromocionesUsuarios.class);
        return promocionesUsuariosRepository.save(promocionesUsuarios);
    }

    // Actualizar
    public PromocionesUsuarios update(Long id_promocionesUsuarios, PromocionesUsuariosDTO promocionesUsuariosDTO) {
        PromocionesUsuarios promocionesUsuariosFromDB = findById(id_promocionesUsuarios);

        ModelMapper mapper = new ModelMapper();
        mapper.map(promocionesUsuariosDTO, promocionesUsuariosFromDB);

        return promocionesUsuariosRepository.save(promocionesUsuariosFromDB);
    }

    // Eliminar
    public void delete(Long id_promocionesUsuarios) {
        PromocionesUsuarios promocionesUsuariosFromDB = findById(id_promocionesUsuarios);
        promocionesUsuariosRepository.delete(promocionesUsuariosFromDB);
    }

    // Generar Excel
    public void generarExcelPromocionesUsuarios(HttpServletResponse response) throws IOException {
        List<PromocionesUsuarios> promocionesUsuarios = promocionesUsuariosRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("promocionesUsuarios Info");

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
        titleCell.setCellValue("Info PromocionesUsuarios");
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
        String[] headers = {"ID_Promocion_usuario", "id_usuario", "id_promocion", "Fecha", "Estado"};
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

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        int rowIndex = 2;
        for (PromocionesUsuarios promocionUsuario : promocionesUsuarios) {
            HSSFRow dataRow = sheet.createRow(rowIndex++);
            dataRow.createCell(0).setCellValue(promocionUsuario.getIdPromocionUsuario());
            dataRow.createCell(1).setCellValue(promocionUsuario.getIdUsuario());
            dataRow.createCell(2).setCellValue(promocionUsuario.getIdPromocion());
            dataRow.createCell(3).setCellValue(promocionUsuario.getFechaAplicacion());
            dataRow.createCell(4).setCellValue(promocionUsuario.getEstado());

            for (int i = 0; i < headers.length; i++) {
                dataRow.getCell(i).setCellStyle(dataStyle);
            }
        }

        // Llenar datos
        int dataRowIndex = 2;
        for (PromocionesUsuarios promocionUsuario : promocionesUsuarios) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex++);
            dataRow.createCell(0).setCellValue(promocionUsuario.getIdPromocionUsuario());
            dataRow.createCell(1).setCellValue(promocionUsuario.getIdUsuario());
            dataRow.createCell(2).setCellValue(promocionUsuario.getIdPromocion());
            dataRow.createCell(3).setCellValue(promocionUsuario.getFechaAplicacion());
            dataRow.createCell(4).setCellValue(promocionUsuario.getEstado());


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