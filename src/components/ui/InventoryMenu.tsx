import { type ReactElement, useState } from 'react';
import { useGameStore } from '../../state/gameStore';
import { Player } from '../../core/entities/Player';
import { ItemSystem } from '../../core/systems/ItemSystem';
import { Item } from '../../core/entities/Item';
import { spriteSystem } from '../../core/systems/SpriteSystem';
import { SpriteRenderer } from '../game/SpriteRenderer';

interface InventoryMenuProps {
  onClose: () => void;
}

export const InventoryMenu = ({ onClose }: InventoryMenuProps): ReactElement => {
  const {
    player,
    useItem,
    equipItem,
    unequipItem,
    dropItem,
    identifyMode,
    completeIdentify,
    cancelIdentify,
  } = useGameStore();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  if (!player) return <></>;

  const { inventory } = player;
  const equipmentBonuses = Player.getEquipmentBonuses(inventory);

  const handleUseItem = (itemId: string) => {
    useItem(itemId);
    setSelectedItem(null);
  };

  const handleEquipItem = (itemId: string) => {
    equipItem(itemId);
    setSelectedItem(null);
  };

  const handleUnequipItem = (slot: 'WEAPON' | 'ARMOR') => {
    unequipItem(slot);
    setSelectedItem(null);
  };

  const handleDropItem = (itemId: string) => {
    dropItem(itemId);
    setSelectedItem(null);
  };

  const handleIdentifyItem = (itemId: string) => {
    completeIdentify(itemId);
    setSelectedItem(null);
  };

  // Get rarity color for items
  const getRarityColor = (item: any) => {
    if (!item.template.tier) return '#ffffff'; // Default for non-tiered items
    switch (item.template.tier) {
      case 1: return '#ffffff'; // Common - White
      case 2: return '#1eff00'; // Uncommon - Green
      case 3: return '#0070dd'; // Rare - Blue
      case 4: return '#a335ee'; // Very Rare - Purple
      case 5: return '#ff8000'; // Epic - Orange
      case 6: return '#ffd100'; // Legendary - Yellow
      case 7: return '#ff0000'; // Mythic - Red
      default: return '#ffffff';
    }
  };

  // Identify mode: only allow selecting unidentified, non-identify-scroll items
  const eligibleForIdentify = (item: any) =>
    !item.identified && item.template.id !== 'scroll_identify';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1c2c',
          border: '2px solid #333',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '800px',
          maxHeight: '80vh',
          overflow: 'auto',
          color: '#fff',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#00ff7f', margin: 0 }}>Inventory</h2>
          <button
            onClick={identifyMode.active ? cancelIdentify : onClose}
            style={{
              backgroundColor: identifyMode.active ? '#888' : '#ff004d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {identifyMode.active ? 'Cancel' : 'Close'}
          </button>
        </div>

        {identifyMode.active && (
          <div style={{ marginBottom: '16px', color: '#ffae00', fontWeight: 'bold', fontSize: '18px', textAlign: 'center' }}>
            Select an item to identify
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#00ff7f', marginBottom: '10px' }}>Equipment</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #333',
                borderRadius: '4px',
                backgroundColor: '#2a2c3c',
              }}
            >
              <strong>Weapon:</strong>
              {inventory.equippedWeapon ? (
                <div style={{ marginTop: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SpriteRenderer
                      spriteId={spriteSystem.getSpriteForEntity('item', inventory.equippedWeapon.template.id)}
                      x={0}
                      y={0}
                      width={24}
                      height={24}
                      fallbackColor="#c0c0c0"
                    />
                    <span style={{ color: getRarityColor(inventory.equippedWeapon) }}>
                      {inventory.equippedWeapon.template.name}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#ccc', marginTop: '2px' }}>
                    {Item.getRarityName(inventory.equippedWeapon)}
                  </div>
                  <button
                    onClick={() => handleUnequipItem('WEAPON')}
                    style={{
                      marginTop: '5px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      backgroundColor: '#ff004d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <div style={{ color: '#666', fontStyle: 'italic' }}>None</div>
              )}
            </div>

            <div
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #333',
                borderRadius: '4px',
                backgroundColor: '#2a2c3c',
              }}
            >
              <strong>Armor:</strong>
              {inventory.equippedArmor ? (
                <div style={{ marginTop: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <SpriteRenderer
                      spriteId={spriteSystem.getSpriteForEntity('item', inventory.equippedArmor.template.id)}
                      x={0}
                      y={0}
                      width={24}
                      height={24}
                      fallbackColor="#c0c0c0"
                    />
                    <span style={{ color: getRarityColor(inventory.equippedArmor) }}>
                      {inventory.equippedArmor.template.name}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#ccc', marginTop: '2px' }}>
                    {Item.getRarityName(inventory.equippedArmor)}
                  </div>
                  <button
                    onClick={() => handleUnequipItem('ARMOR')}
                    style={{
                      marginTop: '5px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      backgroundColor: '#ff004d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                    }}
                  >
                    Unequip
                  </button>
                </div>
              ) : (
                <div style={{ color: '#666', fontStyle: 'italic' }}>None</div>
              )}
            </div>
          </div>

          <div style={{ fontSize: '14px', color: '#ccc' }}>
            <div>Attack Bonus: +{equipmentBonuses.attackBonus}</div>
            <div>Defense Bonus: +{equipmentBonuses.defenseBonus}</div>
          </div>
        </div>

        <div>
          <h3 style={{ color: '#00ff7f', marginBottom: '10px' }}>
            Items ({inventory.items.length})
          </h3>
          {inventory.items.length === 0 ? (
            <div style={{ color: '#666', fontStyle: 'italic', textAlign: 'center', padding: '20px' }}>
              No items in inventory
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
              {inventory.items.map((item) => {
                const isEligible = identifyMode.active && eligibleForIdentify(item);
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: '10px',
                      border: `2px solid ${selectedItem === item.id ? '#ffae00' : '#333'}`,
                      borderRadius: '4px',
                      backgroundColor: isEligible ? '#3a3f5e' : '#2a2c3c',
                      cursor: identifyMode.active
                        ? isEligible
                          ? 'pointer'
                          : 'not-allowed'
                        : 'pointer',
                      opacity: identifyMode.active && !isEligible ? 0.5 : 1,
                    }}
                    onClick={() => {
                      if (identifyMode.active) {
                        if (isEligible) handleIdentifyItem(item.id);
                      } else {
                        setSelectedItem(selectedItem === item.id ? null : item.id);
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                      <SpriteRenderer
                        spriteId={spriteSystem.getSpriteForEntity('item', item.template.id)}
                        x={0}
                        y={0}
                        width={24}
                        height={24}
                        fallbackColor="#ffae00"
                      />
                      <span style={{ fontWeight: 'bold', color: getRarityColor(item) }}>
                        {Item.getDisplayName(item)}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#ccc', marginBottom: '8px' }}>
                      {ItemSystem.getItemDescription(item)}
                    </div>
                    {item.template.tier && (
                      <div style={{ fontSize: '11px', color: getRarityColor(item), marginBottom: '8px' }}>
                        {Item.getRarityName(item)}
                      </div>
                    )}
                    {/* Only show actions if not in identify mode */}
                    {!identifyMode.active && selectedItem === item.id && (
                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                        {ItemSystem.canUseItem(item) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUseItem(item.id);
                            }}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: '#00ff7f',
                              color: 'black',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                            }}
                          >
                            Use
                          </button>
                        )}
                        {ItemSystem.canEquipItem(item) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEquipItem(item.id);
                            }}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              backgroundColor: '#0080ff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                            }}
                          >
                            Equip
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDropItem(item.id);
                          }}
                          style={{
                            padding: '4px 8px',
                            fontSize: '12px',
                            backgroundColor: '#ff004d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                          }}
                        >
                          Drop
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 