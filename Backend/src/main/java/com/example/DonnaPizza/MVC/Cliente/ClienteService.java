package com.example.DonnaPizza.MVC.Cliente;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.example.DonnaPizza.Exception.ResourceNotFoundException;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.modelmapper.ModelMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    // Obtener todos
    public Iterable<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    // Obtener por ID
    public Cliente findById(Long id_cliente) {
        return clienteRepository.findById(id_cliente).orElseThrow(ResourceNotFoundException::new);
    }

    // Agregar
    public Cliente create(ClienteDTO clienteDTO) {
        ModelMapper mapper = new ModelMapper();
        Cliente cliente = mapper.map(clienteDTO, Cliente.class);
        return clienteRepository.save(cliente);
    }

    // Actualizar
    public Cliente update(Long id_cliente, ClienteDTO clienteDTO) {
        Cliente clienteFromDB = findById(id_cliente);

        ModelMapper mapper = new ModelMapper();
        mapper.map(clienteDTO, clienteFromDB);

        return clienteRepository.save(clienteFromDB);
    }

    // Eliminar
    public void delete(Long id_cliente) {
        Cliente clienteFromDB = findById(id_cliente);
        clienteRepository.delete(clienteFromDB);
    }

    // Generar Excel
    public void generarExcelClientes(HttpServletResponse response) throws IOException {
        List<Cliente> clientes = clienteRepository.findAll();

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet = workbook.createSheet("Clientes Info");

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
        titleStyle.setAlignment(HorizontalAlignment.LEFT);
        titleStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        // Crear fila del título y fusionar celdas
        HSSFRow titleRow = sheet.createRow(0);
        HSSFCell titleCell = titleRow.createCell(0);
        titleCell.setCellValue("Info Clientes");
        titleCell.setCellStyle(titleStyle);
        sheet.addMergedRegion(new CellRangeAddress(0, 4, 0, 5)); // Reemplazar el 5 segun la cantidad de headers - 1

        // Cargar imagen desde la carpeta static
        InputStream imageInputStream = new ClassPathResource("static/img/logo_color.png").getInputStream();
        int pictureIdx = workbook.addPicture(imageInputStream.readAllBytes(), Workbook.PICTURE_TYPE_JPEG);
        imageInputStream.close();

        // Crear un lienzo de dibujo en la hoja
        Drawing drawing = sheet.createDrawingPatriarch();

        // Crear un ancla para la imagen
        ClientAnchor anchor = workbook.getCreationHelper().createClientAnchor();

        // Establecer el rango que ocupará la imagen
        anchor.setCol1(4);
        anchor.setRow1(0);
        anchor.setCol2(5);
        anchor.setRow2(4);

        // Crear la imagen
        Picture picture = drawing.createPicture(anchor, pictureIdx);

        // Ajustar el tamaño de la imagen si es necesario
        picture.resize(2, 1.25);

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
        HSSFRow row = sheet.createRow(5);
        String[] headers = {"ID_Cliente", "Nombre", "Apellido", "Email", "Telefono", "Direccion"};
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
        int dataRowIndex = 6;
        for (Cliente cliente : clientes) {
            HSSFRow dataRow = sheet.createRow(dataRowIndex++);
            dataRow.createCell(0).setCellValue(cliente.getId_cliente());
            dataRow.createCell(1).setCellValue(cliente.getNombre());
            dataRow.createCell(2).setCellValue(cliente.getApellido());
            dataRow.createCell(3).setCellValue(cliente.getEmail());
            dataRow.createCell(4).setCellValue(cliente.getTelefono());
            dataRow.createCell(5).setCellValue(cliente.getDireccion());

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