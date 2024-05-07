namespace SistemaVenta.API.Utilidad
{
    // Para todas las solicitudes de las APIs
    public class Response<T>
    {
        public bool status { get; set; }
        public T value { get; set; }
        public string msg { get; set; }
    }
}
