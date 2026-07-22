<?php
defined( 'ABSPATH' ) || exit;
/**
 * Admin Import/Export Setting view.
 *
 * @since 3.0.0
 */

$tabs = array(
	'export' => __( 'Export', 'learnpress-import-export' ),
	'import' => __( 'Import', 'learnpress-import-export' ),
);

/**
 * Extra tabs (e.g. Import Quizzes and Import Questions).
 *
 * @param array $tabs slug => label
 */
$tabs = apply_filters( 'lpie_admin_tabs', $tabs );

$current_tab = lpie_get_current_tab();
if ( ! isset( $tabs[ $current_tab ] ) ) {
	$keys        = array_keys( $tabs );
	$current_tab = $keys[0] ?? 'export';
}

// Only allow known tab slugs for include path.
$allowed_tabs = array_keys( $tabs );
if ( ! in_array( $current_tab, $allowed_tabs, true ) ) {
	$current_tab = 'export';
}
?>

<div class="wrap">
	<h1><?php esc_html_e( 'Import/Export', 'learnpress-import-export' ); ?></h1>
	<h2 class="nav-tab-wrapper lp-nav-tab-wrapper">
		<?php foreach ( $tabs as $slug => $title ) : ?>
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=learnpress-import-export&tab=' . rawurlencode( $slug ) ) ); ?>"
			   class="nav-tab<?php echo $slug === $current_tab ? ' nav-tab-active' : ''; ?>"><?php echo esc_html( $title ); ?></a>
		<?php endforeach; ?>
	</h2>
	<div id="poststuff" class="learn-press-export-import">
		<?php
		$path_tab = dirname( __FILE__ ) . '/' . $current_tab . '.php';
		$path_tab = preg_replace( '/\.\.+/', '', $path_tab );
		$real     = realpath( $path_tab );
		$base     = realpath( dirname( __FILE__ ) );
		if ( $real && $base && strpos( $real, $base ) === 0 && file_exists( $real ) ) {
			include $real;
		} else {
			echo '<div class="notice notice-error"><p>' . esc_html__( 'Tab content not found.', 'learnpress-import-export' ) . '</p></div>';
		}
		?>
	</div>
</div>
