using Microsoft.AspNetCore.SignalR.Client;

namespace Class_Manager_AdminClient.Services
{
    public class SignalRClientService
    {
        private readonly HubConnection _connection;

        public event Action<string, string>? OnMessageReceived;

        public SignalRClientService()
        {
            _connection = new HubConnectionBuilder()
                .WithUrl("https://localhost:7042/adminHub")
                .Build();

      
        }

        public async Task StartAsync()
        {
            if (_connection.State == HubConnectionState.Disconnected)
            {
                await _connection.StartAsync();
            }
        }

        public async Task StopAsync()
        {
            if (_connection.State != HubConnectionState.Disconnected)
            {
                await _connection.StopAsync();
            }
        }


        public async Task CheckLogin(string user, string password)
        {
            if (_connection.State == HubConnectionState.Connected)
            {
                await _connection.InvokeAsync("CheckLogin", user, password);
            }
        }
    }
}
