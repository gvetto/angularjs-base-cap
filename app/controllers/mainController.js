(function () {
    var app = angular.module('app');

    app.controller("mainController", Controller);

    Controller.$inject = ["$scope", "mainService", "$uibModal", "EmlViewer"];

    function Controller($scope, mainService, $modal, EmlViewer) {

        // export
        $scope.displayEvents = displayEvents;

        function init() {
            mainService.getLogDocumentosRecibidos()
                .success(function (response) {
                    $scope.data = response;
                }).error(function (jqXhr, error, throwFn) {
                    // Error handler   
                });
        }

        function displayEvents(item) {
            var modalInstance = $modal.open({
                templateUrl: 'eventmodal.html',
                controller: function ($uibModalInstance, model) {
                    var vm = this;
                    // export
                    vm.title = 'Eventos';
                    vm.summary = model;
                    vm.close = close;
                    vm.displayEml = displayEml;

                    function init() {
                        mainService.getLogDocumentoRecibidoEventos()
                            .success(function (response) {
                                vm.eventos = response.records;
                            }).error(function () {
                                console.log('Error cargando información.');
                            });
                    }

                    function displayEml(evento) {
                        EmlViewer.open({
                            model: evento
                        });
                    }

                    function close() {
                        $uibModalInstance.dismiss('cancel');
                    }

                    init();

                },
                size: "md",
                controllerAs: 'vm',
                resolve: {
                    model: function () {
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $ctrl.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        init();

    }
})();