import React, { useEffect, useRef } from 'react'
import { useTabsContext } from './useTabsContext'
import { usePinContext } from './usePinContext'
import { useControlPanelContext } from './useControlPanelContext'
import type { PinData } from './contexts'
import { LatLng } from 'leaflet'

/**
 * Component that handles the integration between Tabs, Pins, Control Panel, and Map View
 * This avoids circular dependencies by creating a separate integration layer
 * ONLY syncs data when switching tabs, not during active user interactions
 */
export const TabsPinIntegration: React.FC = () => {
  const tabsContext = useTabsContext()
  const pinContext = usePinContext()
  const controlPanelContext = useControlPanelContext()
  const previousTabId = useRef<string | null>(null)
  const isInitialized = useRef(false)

  // Function to get current map center using the control panel (more reliable than global ref)
  const getCurrentMapCenter = (): { lat: number; lng: number } => {
    const currentPosition = controlPanelContext.controls.mapPosition
    console.log(
      'TabsPinIntegration: Getting current map center from control panel:',
      currentPosition,
    )
    return currentPosition
  }

  // Only sync when there's an actual tab switch (not initial load)
  useEffect(() => {
    // Skip the very first run when the app initializes
    if (!isInitialized.current) {
      isInitialized.current = true
      previousTabId.current = tabsContext?.activeTabId || null
      console.log(
        'TabsPinIntegration: Initialized with tab:',
        previousTabId.current,
      )
      return
    }

    // Only proceed if we have a valid tab ID and it's different from previous
    if (
      tabsContext?.activeTabId &&
      previousTabId.current !== tabsContext.activeTabId
    ) {
      console.log('TabsPinIntegration: ACTUAL tab switch detected:', {
        from: previousTabId.current,
        to: tabsContext.activeTabId,
      })

      // Save current state to the PREVIOUS tab before switching
      if (previousTabId.current && pinContext && controlPanelContext) {
        // Save current pins
        const currentPins = [
          pinContext.locationOnePin,
          pinContext.locationTwoPin,
        ].filter((pin): pin is PinData => pin !== null)
        console.log(
          'TabsPinIntegration: Saving pins to previous tab:',
          previousTabId.current,
          currentPins,
        )
        tabsContext.updateTabPins(previousTabId.current, currentPins)

        // Save current control panel settings
        const currentControlPanelSettings = {
          zoom: controlPanelContext.controls.zoom,
          opacity: controlPanelContext.controls.opacity,
          contrast: controlPanelContext.controls.contrast,
          saturation: controlPanelContext.controls.saturation,
          brightness: controlPanelContext.controls.brightness,
          hue: controlPanelContext.controls.hue,
          colorMode: controlPanelContext.controls.colorMode,
          mapPosition: controlPanelContext.controls.mapPosition, // Include map position
        }
        console.log(
          'TabsPinIntegration: Saving control panel settings to previous tab:',
          previousTabId.current,
          currentControlPanelSettings,
        )
        tabsContext.updateTabControlPanelSettings(
          previousTabId.current,
          currentControlPanelSettings,
        )

        // Save current map view
        const currentMapCenter = getCurrentMapCenter()
        const currentMapView = {
          center: new LatLng(currentMapCenter.lat, currentMapCenter.lng),
          zoom: controlPanelContext.controls.zoom, // Use control panel zoom as source of truth
        }
        console.log('TabsPinIntegration: Saving map view to previous tab:', {
          tabId: previousTabId.current,
          mapView: currentMapView,
          centerCoords: {
            lat: currentMapCenter.lat,
            lng: currentMapCenter.lng,
          },
          zoom: controlPanelContext.controls.zoom,
        })
        tabsContext.updateTabMapView(previousTabId.current, currentMapView)
      }

      // Load the NEW tab's state
      if (tabsContext.activeTab && pinContext && controlPanelContext) {
        const { pins, controlPanelSettings, mapView } = tabsContext.activeTab
        console.log('TabsPinIntegration: Loading complete state for new tab:', {
          name: tabsContext.activeTab.name,
          pinsCount: pins?.length || 0,
          controlPanelSettings,
          mapView: {
            center: { lat: mapView.center.lat, lng: mapView.center.lng },
            zoom: mapView.zoom,
          },
        })

        // Load pins
        pinContext.loadPins(pins || [])

        // Load control panel settings
        if (controlPanelSettings) {
          console.log(
            'TabsPinIntegration: Restoring control panel settings:',
            controlPanelSettings,
          )
          // Update each control panel setting
          controlPanelContext.updateZoom(controlPanelSettings.zoom)
          controlPanelContext.updateOpacity(controlPanelSettings.opacity)
          controlPanelContext.updateContrast(controlPanelSettings.contrast)
          controlPanelContext.updateSaturation(controlPanelSettings.saturation)
          controlPanelContext.updateBrightness(controlPanelSettings.brightness)
          controlPanelContext.updateHue(controlPanelSettings.hue)
          controlPanelContext.updateColorMode(controlPanelSettings.colorMode)

          // Update map position if available
          if (controlPanelSettings.mapPosition) {
            controlPanelContext.updateMapPosition(
              controlPanelSettings.mapPosition.lat,
              controlPanelSettings.mapPosition.lng,
            )
          }
        }

        // Map view will be handled by the MapViewController component
        // which listens for activeTabId changes and updates the map accordingly
        console.log(
          'TabsPinIntegration: Map view will be restored by MapViewController:',
          {
            center: { lat: mapView.center.lat, lng: mapView.center.lng },
            zoom: mapView.zoom,
          },
        )
      }

      // Update the previous tab tracker
      previousTabId.current = tabsContext.activeTabId
    }
  }, [tabsContext?.activeTabId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Sync control panel changes back to the current active tab
  useEffect(() => {
    if (tabsContext?.activeTabId && isInitialized.current) {
      // Update the current tab's mapView when map position changes in control panel
      const currentMapView = {
        center: new LatLng(
          controlPanelContext.controls.mapPosition.lat,
          controlPanelContext.controls.mapPosition.lng,
        ),
        zoom: controlPanelContext.controls.zoom,
      }

      console.log(
        'TabsPinIntegration: Syncing control panel changes to active tab:',
        {
          tabId: tabsContext.activeTabId,
          mapView: currentMapView,
        },
      )

      tabsContext.updateTabMapView(tabsContext.activeTabId, currentMapView)
      tabsContext.updateTabControlPanelSettings(
        tabsContext.activeTabId,
        controlPanelContext.controls,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    controlPanelContext.controls.mapPosition.lat,
    controlPanelContext.controls.mapPosition.lng,
    controlPanelContext.controls.zoom,
    tabsContext?.activeTabId,
  ])

  return null // This component doesn't render anything, it just handles the integration
}
