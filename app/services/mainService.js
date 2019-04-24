(function () {

    var app = angular.module('services.mainService', []);

    app.service('mainService', Service);

    Service.$inject = ['$http'];

    function Service($http) {

        function getLogDocumentosRecibidos() {
            var url = 'http://localhost:58295/api/documentosrecibidos/log';
            return $http.get(url);
        }

        function getLogDocumentoRecibidoEventos() {
            var url = 'https://appflowcodevstorage.blob.core.windows.net/devtestmockblob/recepcion/eventos.json';
            return $http.get(url);
        }

        function getLogEventoEml() {
            var url = 'https://appflowcodevstorage.blob.core.windows.net/devtestmockblob/recepcion/eml.json';
            return $http.get(url);
        }

        return {
            getLogDocumentosRecibidos: getLogDocumentosRecibidos,
            getLogDocumentoRecibidoEventos: getLogDocumentoRecibidoEventos,
            getLogEventoEml: getLogEventoEml
        }
    }

})();