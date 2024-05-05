using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using AutoMapper;
using SistemaVenta.DTO;
using SistemaVenta.Model;

namespace SistemaVenta.Utility
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            #region Rol
            CreateMap<Rol, RolDTO>().ReverseMap();
            #endregion Rol

            #region Menu
            CreateMap<Menu, MenuDTO>().ReverseMap();
            #endregion Menu

            #region Usuario
            CreateMap<Usuario, UsuarioDTO>()
                .ForMember(destino => 
                    destino.RolDescripcion, opciones => 
                        opciones.MapFrom(origen => 
                            origen.IdRolNavigation.Nombre)
                )
                .ForMember(destino =>
                    destino.EsActivo, opciones =>
                        opciones.MapFrom(origen =>
                            origen.EsActivo == true ? 1 : 0)
                );

            CreateMap<Usuario, SesionDTO>()
                .ForMember(destino =>
                    destino.RolDescripcion, opciones =>
                        opciones.MapFrom(origen =>
                            origen.IdRolNavigation.Nombre)
                );

            CreateMap<UsuarioDTO, Usuario>()
                .ForMember(destino =>
                    destino.IdRolNavigation, opciones =>
                        opciones.Ignore()
                )
                .ForMember(destino =>
                    destino.EsActivo, opciones =>
                        opciones.MapFrom(origen =>
                            origen.EsActivo == 1 ? true : false)
                );
            #endregion Usuario

            #region Categoria
            CreateMap<Categoria, CategoriaDTO>().ReverseMap();
            #endregion Categoria

            #region Producto
            CreateMap<Producto, ProductoDTO>()
                .ForMember(destino => 
                    destino.DescripcionCategoria,
                        opciones => opciones.MapFrom(
                            origen => origen.IdCategoriaNavigation.Nombre)
                )
                .ForMember(
                    destino => destino.Precio,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.EsActivo,
                        opciones => opciones.MapFrom(
                            origen => origen.EsActivo == true ? 1 : 0)
                );

            CreateMap<ProductoDTO, Producto>()
                .ForMember(destino =>
                    destino.IdCategoriaNavigation,
                        opciones => opciones.Ignore()
                )
                .ForMember(
                    destino => destino.Precio,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToDecimal(origen.Precio, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.EsActivo,
                        opciones => opciones.MapFrom(
                            origen => origen.EsActivo == 1 ? true : false)
                );
            #endregion Producto

            #region Venta
            CreateMap<Venta, VentaDTO>()
                .ForMember(
                    destino => destino.TotalTexto,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.FechaRegistro,
                        opciones => opciones.MapFrom(
                            origen => origen.FechaRegistro.Value.ToString("dd/MM/yyyy"))
                );

            CreateMap<VentaDTO, Venta>()
                .ForMember(
                    destino => destino.Total,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToDecimal(origen.TotalTexto, new CultureInfo("es-MX")))
                );
            #endregion Venta

            #region DetalleVenta
            CreateMap<DetalleVenta, DetalleVentaDTO>()
                .ForMember(
                    destino => destino.DescripcionProducto,
                        opciones => opciones.MapFrom(
                            origen => origen.IdProductoNavigation.Nombre)
                )
                .ForMember(
                    destino => destino.PrecioTexto, 
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.TotalTexto,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-MX")))
                );

            CreateMap<DetalleVentaDTO, DetalleVenta>()
                .ForMember(
                    destino => destino.Precio,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToDecimal(origen.PrecioTexto, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.Total,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToDecimal(origen.TotalTexto, new CultureInfo("es-MX")))
                );
            #endregion DetalleVenta

            #region Reporte
            CreateMap<DetalleVenta, ReporteDTO>()
                .ForMember(
                    destino => destino.FechaRegistro,
                        opciones => opciones.MapFrom(
                            origen => origen.IdVentaNavigation.FechaRegistro.Value.ToString("dd/MM/yyyy"))
                )
                .ForMember(
                    destino => destino.NumeroDocumento,
                        opciones => opciones.MapFrom(
                            origen => origen.IdVentaNavigation.NumeroDocumento)
                )
                .ForMember(
                    destino => destino.TipoPago,
                        opciones => opciones.MapFrom(
                            origen => origen.IdVentaNavigation.TipoPago)
                )
                .ForMember(
                    destino => destino.TotalVenta,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.IdVentaNavigation.Total.Value, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.Producto,
                        opciones => opciones.MapFrom(
                            origen => origen.IdProductoNavigation.Nombre)
                )
                .ForMember(
                    destino => destino.Precio,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.Precio.Value, new CultureInfo("es-MX")))
                )
                .ForMember(
                    destino => destino.Total,
                        opciones => opciones.MapFrom(
                            origen => Convert.ToString(origen.Total.Value, new CultureInfo("es-MX")))
                );
            #endregion Reporte
        }
    }
}
