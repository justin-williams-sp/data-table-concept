/* global angular */
var app = angular.module('tableTemplateApp', []);

app.controller('PageCtrl', function(managePasswordDataService) {
    this.items = [
        {
            foo: 'A',
            bar: 'Eh',
            baz: ''
        }, {
            foo: 'B',
            bar: 'Bee',
            baz: ''
        }, {
            foo: 'C',
            bar: 'Sea',
            baz: ''
        }
    ];

    this.cols = [
        {
            label: 'first',
            prop: 'foo'
        }, {
            label: 'second',
            prop: 'bar'
        }, {
            label: 'third',
            prop: 'baz'
        }
    ];
    
    this.toggleFunc = function(item) {
        managePasswordDataService.toogleExpanded(item);
    }
    
    this.isExpanded = function(item) {
        return managePasswordDataService.isExpanded(item);

    }
    
});

app.factory('managePasswordDataService', function() {
    var service = {};
    var expandedItems = {};
    service.isExpanded = function(item) {
        return !!expandedItems[item.foo];
    }
    
    service.toogleExpanded = function(item) {
        if(expandedItems[item.foo]) {
            expandedItems[item.foo] = undefined;
        } else {
            expandedItems[item.foo] = item;
        }
    }
    return service;
});

app.directive('spDataTable', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/sp-date-table.html',
        controller: function() {},
        controllerAs: 'tableCtrl',
        bindToController: true,
        scope: {
            cols: '=',
            items: '=',
            expanderTemplate: '@',
            expanderFunc: '&',
            rowFunc: '&'
        }
    }
});

app.directive('passwordExpander', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/password-expander.html',
        controller: function(managePasswordDataService) {
            this.toggle = function() {
                managePasswordDataService.toogleExpanded(this.item);
            }
        },
        controllerAs: 'expanderCtrl',
        bindToController: true,
        scope: {
            item: '='
        }
    }
});

app.directive('managePasswordBtn', function() {
    return {
        restrict: 'E',
        template: '<input type="button" ng-disabled="mpBtnCtrl.isExpanded()" ng-click="mpBtnCtrl.toggle()" value="Change"></input>',
        controller: function(managePasswordDataService) {
            this.toggle = function() {
                managePasswordDataService.toogleExpanded(this.item);
            }
            this.isExpanded = function() {
                managePasswordDataService.isExpanded(this.item);
            }
        },
        controllerAs: 'mpBtnCtrl',
        bindToController: true,
        scope: {
            item: '='
        }
    }
});
