package com.example.DonnaPizza.MVC.Reportes;

import com.example.DonnaPizza.MVC.Cliente.ClienteService;
import com.example.DonnaPizza.MVC.Documentos.DocumentosService;
import com.example.DonnaPizza.MVC.Ingredientes.IngredientesService;
import com.example.DonnaPizza.MVC.Pizzas.PizzasService;
import com.example.DonnaPizza.MVC.PizzasFamiliares.PizzasFamiliaresService;
import com.example.DonnaPizza.MVC.Promociones.PromocionesServices;
import com.example.DonnaPizza.MVC.PromocionesUsuarios.PromocionesUsuariosService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
//Desarrollo de todos
@RestController
public class ReportesControlador {

    @Autowired
    private PizzasService servicioPizzas;

    @Autowired
    private ClienteService servicioCliente;

    @Autowired
    private DocumentosService servicioDocumentos;

    @Autowired
    private PromocionesServices servicioPromociones;

    @Autowired
    PromocionesUsuariosService servicioPromocionesUsuarios;

    @Autowired
    private IngredientesService servicioIngredientes;

    @Autowired
    private PizzasFamiliaresService servicioPizzasFamiliares;

    @GetMapping("/excelpizzas")
    public void generarExcelReportePizzas(HttpServletResponse response) throws IOException {

        response.setContentType("application/octet-stream");

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=pizzas.xls";

        response.setHeader(headerKey, headerValue);

        servicioPizzas.generarExcelPizzas(response);
    }

    @GetMapping("/excelclientes")
    public void generarExcelReporteClientes(HttpServletResponse response) throws IOException {

        response.setContentType("application/octet-stream");

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=clientes.xls";

        response.setHeader(headerKey, headerValue);

        servicioCliente.generarExcelClientes(response);
    }

    @GetMapping("/exceldocumentos")
    public void generarExcelReportesDocumentos(HttpServletResponse response) throws IOException{

        response.setContentType("application/octet-stream");

        String headerKey="Content-Disposition";
        String headerValue="attachment; filename=documentos.xls";

        response.setHeader(headerKey,headerValue);

        servicioDocumentos.generarExcelDocumento(response);
    }

    @GetMapping("/excelpromociones")
    public void generarExcelReportesPromociones(HttpServletResponse response) throws IOException{

        response.setContentType("application/octet-stream");

        String headerKey= "Content-Disposition";
        String headerValue="attachment; filename=promociones.xls";

        response.setHeader(headerKey,headerValue);

        servicioPromociones.generarExcelPromociones(response);
    }

    @GetMapping("/excelpromocionesusuarios")
    public void generarExcelReportesPromocionesUsuarios(HttpServletResponse response) throws IOException{

        response.setContentType("application/octet-stream");

        String headerKey= "Content-Disposition";
        String headerValue="attachment; filename=promocionesUsuarios.xls";

        response.setHeader(headerKey,headerValue);

        servicioPromocionesUsuarios.generarExcelPromocionesUsuarios(response);
    }
    @GetMapping("/excelingredientes")
    public void generarExcelReporteIngredientes(HttpServletResponse response) throws IOException {

        response.setContentType("application/octet-stream");

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=ingredientes.xls";

        response.setHeader(headerKey, headerValue);

        servicioIngredientes.generarExcelIngredientes(response);
    }

    @GetMapping("/excelpizzasfamiliares")
    public void generarExcelReportePizzasFamiliares(HttpServletResponse response) throws IOException {

        response.setContentType("application/octet-stream");

        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=pizzasfamiliares.xls";

        response.setHeader(headerKey, headerValue);

        servicioPizzasFamiliares.generarExcelPizzasFamiliares(response);
    }
}
