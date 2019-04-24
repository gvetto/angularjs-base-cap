(function () {

    var module = angular.module('components.emlViewer', []);

    module.provider('EmlViewer', Provider);

    Provider.$inject = [];

    function Provider() {

        this.$get = ['mainService', '$uibModal', function (mainService, $modal) {

            function open(options) {

                var modalInstance = $modal.open({
                    templateUrl: 'eventemlmodal.html',
                    controller: function ($uibModalInstance, model) {
                        var vm = this;
                        // export
                        vm.title = 'Eml';
                        vm.close = close;

                        function init() {
                            mainService.getEventoEml()
                                .success(function (response) {
                                    vm.model = response;
                                }).error(function () {
                                    console.log('Error cargando información.');
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
                            return options.model;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $ctrl.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });

            }            

            // export
            return {
                open: open
            };

        }];

    }

})();